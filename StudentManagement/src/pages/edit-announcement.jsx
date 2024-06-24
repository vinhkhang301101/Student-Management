import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PATH } from "../config/path";
import { useForm } from "../hooks/useForm";
import { useQuery } from "../hooks/useQuery";
import { announcementService } from "../services/announcement.js";
import { required } from "../utils/validate";
import Field from "../Components/Field";
import { Button, Form, Spin, Upload, message } from "antd";
import { ButtonCom } from "../Components/Button";
import { handleError } from "../utils/handleError.js";
import { useAsync } from "../hooks/useAsync.js";

const rules = {
  title: [required()],
};

export const EditAnnouncements = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading: getAnnouncementLoading } = useQuery({
    queryFn: () => announcementService.getAnnouncementById(id),
    enabled: !!id,
  });

  const announcementForm = useForm(rules, { initialValue: data.data });

  const { loading: updateLoading, excute: updateAnnouncement } =
    useAsync(announcementService.updateAnnouncement);

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (announcementForm.validate()) {
      updateAnnouncement(announcementForm.values, id)
        .then((res) => {
          navigate(PATH.Announcement.index);
          message.success("Announcement info has been updated successfully!");
        })
        .catch(handleError);
    }
  };

  if (getAnnouncementLoading) {
    return (
      <div className="content container-fluid">
        <Spin fullscreen size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Edit Announcement</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={PATH.Announcement.index}>Announcements</Link>
                </li>
                <li className="breadcrumb-item active">Edit Announcement</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-12">
                      <h5 className="form-title">
                        <span>Announcement Information</span>
                      </h5>
                    </div>
                    <div className="col-9">
                      <div className="form-group">
                        <Field
                          label="Title"
                          placeholder="Title"
                          required
                          {...announcementForm.register("title")}
                        />
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="form-group">
                        <Field
                          label="Description"
                          placeholder="Description"
                          {...announcementForm.register("description")}
                        />
                      </div>
                    </div>
                    {/* <div className="col-12 col-sm-12">
                      <div className="form-group">
                        <label>Due Date</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="Sep 06, 11:59 pm"
                        />
                      </div>
                    </div> */}
                    <div className="col-12">
                      <ButtonCom
                        onClick={onSubmit}
                        loading={updateLoading}
                        className="btn btn-primary"
                      >
                        Submit
                      </ButtonCom>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
