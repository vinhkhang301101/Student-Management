import React from 'react'
import { Link } from 'react-router-dom';
import { PATH } from '../config/path';

export const EditFees = () => {
  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Edit Fees</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={PATH.Fees.index}>Fees</Link>
                </li>
                <li className="breadcrumb-item active">Edit Fees</li>
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
                        <span>Fees Information</span>
                      </h5>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Fees ID</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="PRE1234"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Class</label>
                        <select className="form-control">
                          <option>9</option>
                          <option>LKG</option>
                          <option>UKG</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                          <option>11</option>
                          <option>12</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Start Date</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="23 Apr 2020"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>End Date</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="28 Apr 2020"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12">
                      <div className="form-group">
                        <label>Fees Amount</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="345.000 VND"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
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
}
