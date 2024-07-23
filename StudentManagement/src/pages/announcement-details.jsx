import React, { useRef, useState } from 'react'
import { Link, generatePath, useNavigate, useParams } from 'react-router-dom';
import { PATH } from '../config/path';
import { useQuery } from '../hooks/useQuery';
import { announcementService } from '../services/announcement';
import { Button, Upload, Modal, Spin, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useForm } from '../hooks/useForm';
import { fileService } from '../services/file';
import { useAsync } from '../hooks/useAsync';
import { ButtonCom } from '../components/Button';
import { PORT_BACKEND } from '../config/api';
import { useReload } from "../hooks/useReload";
import { useAuthRedux } from '../hooks/useAuthRedux';

export const AnnouncementDetails = () => {
  const { user } = useAuthRedux();
  const { id } = useParams();
  const uploadRef = useRef();
  const navigate = useNavigate();
  const {
    reload: reloadAnnouncementDetails,
    ForceReload: ForceReloadAnnouncementDetails,
  } = useReload();
  const [openModalUploadFile, setOpenModalUploadFile] = useState(false);
  const { loading: loadingUploadFile, excute: uploadFileService } = useAsync(
    fileService.upload
  );

  const uploadFileForm = useForm({
    // title: [required()],
    // filename: [required()],
  });

  const [fileUploadToAnnouncement, setFileUploadToAnnouncement] =
    useState(null);

  const { data, loading } = useQuery({
    queryFn: () => announcementService.getAnnouncementById(id),
    enabled: !!id,
    dependencyList: [reloadAnnouncementDetails],
    onError: () => {
      message.error("Announcement is not exist!");
      navigate(PATH.Announcement.index);
    },
  });

  if (loading) {
    return (
      <div className="content container-fluid">
        <Spin fullscreen size="large" />
      </div>
    );
  }

  const onUploadFile = async () => {
    if (!fileUploadToAnnouncement) {
      message.error("Please select a file");
      return;
    }

    if (uploadFileForm.validate()) {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("file", fileUploadToAnnouncement);
      formData.append("title", data.data.title);

      const responseUploadFile = await uploadFileService(formData);
      console.log(responseUploadFile);
      message.success("Upload file successfully!");
      setFileUploadToAnnouncement(null);
      setOpenModalUploadFile(false);
      uploadFileForm.reset();
      ForceReloadAnnouncementDetails();
    }
  };

  const onFileChange = (info) => {
    console.log(info);
    setFileUploadToAnnouncement(info.file);
    if (info.file.status === "removed") {
      setFileUploadToAnnouncement(null);
    }
  };

  const downloadPDF = (pdf) => {
    window.open(
      `http://localhost:${PORT_BACKEND}/files/${pdf}`,
      "_blank",
      "noreferrer"
    );
  };

  const modalStyles = {
    mask: {
      backdropFilter: "blur(10px)",
    },
  };

  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <h3 className="page-title">Announcement Details</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={PATH.Announcement.index}>Announcements</Link>
                </li>
                <li className="breadcrumb-item active">Announcement Details</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="profile-header">
              <div className="row align-items-center">
                <div className="col ml-md-n2">
                  <h3 className="text-danger fw-bold">{data.data.title}</h3>
                  <p className="post-date mb-0">{data.data.updatedAt}</p>
                </div>
                {user?.role == "Teacher" ? (
                  <div className="col-auto profile-bt ">
                    <Link
                      to={generatePath(PATH.Announcement.EditAnnouncements, {
                        id: id,
                      })}
                      className="btn btn-primary mr-3"
                    >
                      <i className="fas fa-pen mr-2" />
                      Edit
                    </Link>
                    <ButtonCom
                      onClick={() => setOpenModalUploadFile(true)}
                      className="btn btn-primary"
                    >
                      <i className="fas fa-upload mr-2" />
                      Upload file
                    </ButtonCom>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="tab-content profile-tab-cont">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <span className="fw-bold">Description</span>
                      </h5>
                      <span>{data.data.description}</span>
                      {data.data.files.map((file) => (
                        <div key={file._id} className="card flex-fill mt-4">
                          <div className="card-header">
                            <div className="row align-items-center mt-2 mb-2">
                              <div className="col-6">
                                <h5 className="card-title fw-bold">
                                  {file.title}
                                </h5>
                              </div>
                              <div className="col-6">
                                <div className="float-right">
                                  <ButtonCom
                                    onClick={() => downloadPDF(file.pdf)}
                                    className="btn btn-info"
                                  >
                                    <i className="fas fa-download mr-2" />
                                    Download
                                  </ButtonCom>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="file-card">
                              <span className="mt-6 mb-6">{file.filename}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="Upload file to Announcements"
          centered
          open={openModalUploadFile}
          onOk={onUploadFile}
          confirmLoading={loadingUploadFile}
          onCancel={() => setOpenModalUploadFile(false)}
          width={300}
          styles={modalStyles}
        >
          <form>
            {/* <div className="form-group mt-3">
              <Field
                label="Title"
                placeholder="Title"
                required
                {...uploadFileForm.register("title")}
              />
            </div> */}
            {/* <div className="form-group">
              <Field
                label="Filename"
                placeholder="Filename"
                required
                {...uploadFileForm.register("filename")}
              />
            </div> */}
            <div className="form-group">
              <Upload
                ref={uploadRef}
                accept="application/pdf"
                fileList={
                  fileUploadToAnnouncement == null
                    ? []
                    : [fileUploadToAnnouncement]
                }
                beforeUpload={() => false}
                onChange={onFileChange}
              >
                <Button icon={<UploadOutlined />}>Select file</Button>
              </Upload>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};
