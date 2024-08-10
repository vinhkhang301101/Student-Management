import React, { useState } from "react";
import { useQuery } from "../../hooks/useQuery";

import { Modal, Form, Input, message, TreeSelect, Button, Upload } from "antd";

import { useAsync } from "../../hooks/useAsync";
import { userService } from "../../services/user.js";
import { announcementService } from "../../services/announcement.js";
import { UploadOutlined } from "@ant-design/icons";

const ModalAddAnnouncement = ({
  openModalAnnouncement,
  setOpenModalAnnouncement,
  ForceReloadAnnouncement,
}) => {
  // const uploadRef = useRef();
  // const [fileUploadToAnnouncement, setFileUploadToAnnouncement] =
  //   useState(null);
  const { loading: loadingAllUserID, data: allUserIDData } = useQuery({
    queryFn: () => userService.getUsersID(),
  });
  const { execute: addAnnouncement } = useAsync(
    announcementService.addAnnouncement
  );
  const [announcementForm] = Form.useForm();

  // const onFileChange = (info) => {
  //   console.log(info);
  //   setFileUploadToAnnouncement(info.file);
  //   if (info.file.status === "removed") {
  //     setFileUploadToAnnouncement(null);
  //   }
  // };

  let treeData = [];

  if (!loadingAllUserID) {
    treeData = [
      {
        label: "All students",
        value: "All students",
        children: allUserIDData.userArr
          .filter((user) => user?.role == "Student")
          .map((user) => ({
            label: user?.fullname,
            value: user?._id,
            key: user?._id,
          })),
      },
    ];
  }

  const handleAddAnnouncement = () => {
    // if (!fileUploadToAnnouncement) {
    //   message.error("Please select a file");
    //   return;
    // }

    announcementForm
      .validateFields()
      .then(async () => {
        const specificUserID = announcementForm
          .getFieldValue("userIDArr")
          .filter((arrID) => !arrID.includes("All"));
        const allStudent = announcementForm
          .getFieldValue("userIDArr")
          .filter((arrID) => arrID.includes("Student"));
        const isAll =
          allStudent?.length > 0
            ? "Student"
            : "user";
        let finalArrID = [];
        switch (isAll) {
          case "user":
            allUserIDData.userArr.map((user) => {
              finalArrID.push(user?._id);
            });
            break;
          case "Student":
            allUserIDData.userArr.map(
              (user) => user?.role == "Student" && finalArrID.push(user?._id)
            );
            break;
        }
        finalArrID = finalArrID.concat(specificUserID);
        console.log("finalArrID is : ", finalArrID);
        console.log(announcementForm.getFieldsValue());

        const res = await addAnnouncement({
          ...announcementForm.getFieldsValue(),
          userIDArr: finalArrID,
          isAll,
        });

        console.log("test");

        if (res.success == true) {
          ForceReloadAnnouncement();
          setOpenModalAnnouncement(false);
          announcementForm.resetFields();
          message.success("Added announcement successfully!");
        }
      })
      .catch((data) => {});
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  return (
    <Modal
      title="Add announcement"
      centered
      open={openModalAnnouncement}
      onOk={handleAddAnnouncement}
      onCancel={() => setOpenModalAnnouncement(false)}
      width={1000}
    >
      <Form
        name="Add announcement form"
        {...formItemLayout}
        form={announcementForm}
        initialValues={{
          title: "",
          description: "",
          sendTo: "",
        }}
        layout="horizontal"
      >
        <Form.Item
          name={"title"}
          label="Title"
          rules={[{ required: true, message: "Please fill in this field!" }]}
        >
          <Input placeholder={"Title of announcement"} />
        </Form.Item>
        <Form.Item
          name={"description"}
          label="Description"
          rules={[{ required: true, message: "Please fill in this field!" }]}
        >
          <Input placeholder={"Description of announcement"} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please fill in this field!" }]}
          name={"userIDArr"}
          label="Choose users"
        >
          <TreeSelect
            style={{ width: "100%" }}
            // value={userPickedAnnounce}
            treeCheckable
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={treeData}
            placeholder="Choose users to send announcement"
            // treeDefaultExpandAll
            showCheckedStrategy={TreeSelect.SHOW_PARENT}
            // onChange={value => setUserPickedAnnounce({value})}
          />
        </Form.Item>
        {/* <Form.Item>
          <Upload
            ref={uploadRef}
            accept="application/pdf"
            fileList={
              fileUploadToAnnouncement == null ? [] : [fileUploadToAnnouncement]
            }
            beforeUpload={() => false}
            onChange={onFileChange}
          >
            <Button icon={<UploadOutlined />}>Select file</Button>
          </Upload>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default ModalAddAnnouncement;
