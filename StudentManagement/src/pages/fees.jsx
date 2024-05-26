import React from 'react'
import { Link } from 'react-router-dom';
import { PATH } from '../config/path';

export const Fees = () => {
  return (
    <>
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Fees</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Fees</li>
              </ul>
            </div>
            <div className="col-auto text-right float-right ml-auto">
              <Link to={PATH.Fees.AddFees} className="btn btn-primary">
                <i className="fas fa-plus" /> Add Fees
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover table-center mb-0 datatable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Class</th>
                        <th>Amount</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>PRE2209</td>
                        <td>10</td>
                        <td>345.000 VND</td>
                        <td>23 Apr 2020</td>
                        <td>28 Apr 2020</td>
                        <td className="text-right">
                          <div className="actions">
                            <Link
                              to={PATH.Fees.EditFees}
                              className="btn btn-sm bg-success-light mr-2"
                            >
                              <i className="fas fa-pen" />
                            </Link>
                            <a href="#" className="btn btn-sm bg-danger-light">
                              <i className="fas fa-trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>PRE2213</td>
                        <td>1</td>
                        <td>255.000 VND</td>
                        <td>23 Apr 2020</td>
                        <td>28 Apr 2020</td>
                        <td className="text-right">
                          <div className="actions">
                            <Link
                              to={PATH.Fees.EditFees}
                              className="btn btn-sm bg-success-light mr-2"
                            >
                              <i className="fas fa-pen" />
                            </Link>
                            <a href="#" className="btn btn-sm bg-danger-light">
                              <i className="fas fa-trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>PRE2143</td>
                        <td>9</td>
                        <td>545.000 VND</td>
                        <td>23 Apr 2020</td>
                        <td>28 Apr 2020</td>
                        <td className="text-right">
                          <div className="actions">
                            <Link
                              to={PATH.Fees.EditFees}
                              className="btn btn-sm bg-success-light mr-2"
                            >
                              <i className="fas fa-pen" />
                            </Link>
                            <a href="#" className="btn btn-sm bg-danger-light">
                              <i className="fas fa-trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>PRE2431</td>
                        <td>8</td>
                        <td>234.000 VND</td>
                        <td>23 Apr 2020</td>
                        <td>28 Apr 2020</td>
                        <td className="text-right">
                          <div className="actions">
                            <Link
                              to={PATH.Fees.EditFees}
                              className="btn btn-sm bg-success-light mr-2"
                            >
                              <i className="fas fa-pen" />
                            </Link>
                            <a href="#" className="btn btn-sm bg-danger-light">
                              <i className="fas fa-trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>PRE1534</td>
                        <td>7</td>
                        <td>265.000 VND</td>
                        <td>23 Apr 2020</td>
                        <td>28 Apr 2020</td>
                        <td className="text-right">
                          <div className="actions">
                            <Link
                              to={PATH.Fees.EditFees}
                              className="btn btn-sm bg-success-light mr-2"
                            >
                              <i className="fas fa-pen" />
                            </Link>
                            <a href="#" className="btn btn-sm bg-danger-light">
                              <i className="fas fa-trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>PRE2153</td>
                        <td>2</td>
                        <td>334.000 VND</td>
                        <td>23 Apr 2020</td>
                        <td>28 Apr 2020</td>
                        <td className="text-right">
                          <div className="actions">
                            <Link
                              to={PATH.Fees.EditFees}
                              className="btn btn-sm bg-success-light mr-2"
                            >
                              <i className="fas fa-pen" />
                            </Link>
                            <a href="#" className="btn btn-sm bg-danger-light">
                              <i className="fas fa-trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>PRE1434</td>
                        <td>6</td>
                        <td>341.000 VND</td>
                        <td>23 Apr 2020</td>
                        <td>28 Apr 2020</td>
                        <td className="text-right">
                          <div className="actions">
                            <Link
                              to={PATH.Fees.EditFees}
                              className="btn btn-sm bg-success-light mr-2"
                            >
                              <i className="fas fa-pen" />
                            </Link>
                            <a href="#" className="btn btn-sm bg-danger-light">
                              <i className="fas fa-trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>PRE2345</td>
                        <td>12</td>
                        <td>365.000 VND</td>
                        <td>23 Apr 2020</td>
                        <td>28 Apr 2020</td>
                        <td className="text-right">
                          <div className="actions">
                            <Link
                              to={PATH.Fees.EditFees}
                              className="btn btn-sm bg-success-light mr-2"
                            >
                              <i className="fas fa-pen" />
                            </Link>
                            <a href="#" className="btn btn-sm bg-danger-light">
                              <i className="fas fa-trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>PRE2365</td>
                        <td>11</td>
                        <td>483.000 VND</td>
                        <td>23 Apr 2020</td>
                        <td>28 Apr 2020</td>
                        <td className="text-right">
                          <div className="actions">
                            <Link
                              to={PATH.Fees.EditFees}
                              className="btn btn-sm bg-success-light mr-2"
                            >
                              <i className="fas fa-pen" />
                            </Link>
                            <a href="#" className="btn btn-sm bg-danger-light">
                              <i className="fas fa-trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>PRE1234</td>
                        <td>5</td>
                        <td>242.000 VND</td>
                        <td>23 Apr 2020</td>
                        <td>28 Apr 2020</td>
                        <td className="text-right">
                          <div className="actions">
                            <Link
                              to={PATH.Fees.EditFees}
                              className="btn btn-sm bg-success-light mr-2"
                            >
                              <i className="fas fa-pen" />
                            </Link>
                            <a href="#" className="btn btn-sm bg-danger-light">
                              <i className="fas fa-trash" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
