import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";
import { useAuthRedux } from "../hooks/useAuthRedux";
// import { getUser } from "../utils/token";

export const Profile = () => {
  const { user } = useAuthRedux();
  // const { data, loading } = useQuery({
  //   queryFn: () => classService.getClass(),
  // });

  // if (loading) return null;

  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <h3 className="page-title">Profile</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Profile</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="profile-header">
              <div className="row align-items-center">
                <div className="col-auto profile-image">
                  <a href="#">
                    <img
                      className="rounded-circle"
                      alt="User Image"
                      src="img/user.jpg"
                    />
                  </a>
                </div>
                <div className="col ml-md-n2 profile-user-info">
                  <h4 className="user-name mb-0">{user.data[0].fullname}</h4>
                  <div className="user-Location">
                    <i className="fas fa-map-marker-alt" />{" "}
                    {user.data[0].address}
                  </div>
                  <div className="about-text">{user.data[0].role}.</div>
                </div>
                <div className="col-auto profile-btn">
                  <Link
                    to={PATH.Profile.EditProfile}
                    className="btn btn-primary"
                  >
                    <i className="fas fa-pen mr-2" />
                    Edit
                  </Link>
                </div>
              </div>
            </div>
            <div className="tab-content profile-tab-cont">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title d-flex justify-content-between">
                        <span>Personal Details</span>
                        <Link
                          className="edit-link"
                          data-toggle="modal"
                          to={PATH.Profile.EditProfile}
                        >
                          <i className="far fa-edit mr-1" />
                          Edit
                        </Link>
                      </h5>
                      <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                          Full Name
                        </p>
                        <p className="col-sm-9">{user.data[0].fullname}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                          Date of Birth
                        </p>
                        <p className="col-sm-9">{user.data[0].date}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                          Email Address
                        </p>
                        <p className="col-sm-9">{user.data[0].email}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">
                          Phone Number
                        </p>
                        <p className="col-sm-9">{user.data[0].phone}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-3 text-muted text-sm-right mb-0">
                          Address
                        </p>
                        <p className="col-sm-9 mb-0">{user.data[0].address}.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Change Password</h5>
                  <div className="row">
                    <div className="col-md-10 col-lg-6">
                      <form>
                        <div className="form-group">
                          <label>Old Password</label>
                          <input type="password" className="form-control" />
                        </div>
                        <div className="form-group">
                          <label>New Password</label>
                          <input type="password" className="form-control" />
                        </div>
                        <div className="form-group">
                          <label>Confirm Password</label>
                          <input type="password" className="form-control" />
                        </div>
                        <button className="btn btn-primary" type="submit">
                          Save Changes
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
