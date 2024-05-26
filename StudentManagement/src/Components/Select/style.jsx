import styled from "styled-components";

export const SelectStyle = styled.div`
  position: relative;
  height: 40px;
  width: 100%;
  flex: 1;
  .head {
    /* height: 100%;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0em;
    text-align: left;
    position: relative;
    line-height: 40px;
    padding: 0.375rem 0.75rem;
    border: 1px solid #ddd;
    cursor: pointer;
    box-shadow: none;*/
    color: #333;
    // @include overtext(1);
    &:focus {
      border-color: #18aefa;
      outline: 0 none;
      box-shadow: none;
    }
  }

  .sub {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #f8f8f8;
    z-index: 100;

    a {
      /* font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 1.5;
      height: 40px;
      line-height: 60px;
      padding: 0 25px;
      border: 1px solid #dbe0df;
      width: 100%; */
      margin-top: -1px;
      display: block;
      color: #333;
      &:hover {
        background: #f1f1f1;
      }
    }
  }
`;