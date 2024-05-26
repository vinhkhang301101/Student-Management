import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";
import { useDispatch } from "react-redux";
import { useQuery } from "../hooks/useQuery";
import { required } from "../utils/validate";
import { useForm } from "../hooks/useForm";
import { addAnnouncementAction } from "../store/announcement";
import Field from "../Components/Field";
import { Button } from "../Components/Button";
import { handleError } from "../utils/handleError";
import { message } from "antd";

export const AddAnnouncements = () => {
  const dispatch = useDispatch();
  const { loading } = useQuery({
    enabled: false,
    limitDuration: 1000,
  });

  const announcementForm = useForm({
    title: [required()],
  });

  const onAddAnnouncement = (ev) => {
    ev.preventDefault();
    try {
      if (announcementForm.validate()) {
        dispatch(addAnnouncementAction(announcementForm.values));
        announcementForm.reset();
        message.success("Added announcement successfully!");
      }
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Add Announcement</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={PATH.Announcement.index}>Announcements</Link>
                </li>
                <li className="breadcrumb-item active">Add Announcement</li>
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
                          renderInput={(props) => (
                            <textarea {...props} placeholder="Description" className="form-control" />
                          )}
                          {...announcementForm.register("description")}
                        />
                      </div>
                    </div>
                    {/* <div className="col-9">
                      <div className="form-group">
                        <Field
                          label="Due Date"
                          placeholder="Due Date"
                          required
                          {...announcementForm.register("date")}
                        />
                      </div>
                    </div> */}
                    <div className="col-12">
                      <Button
                        onClick={onAddAnnouncement}
                        loading={loading}
                        className="btn btn-primary"
                      >
                        Submit
                      </Button>
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