import { PATH } from "../config/path";
import { EditFees } from "../pages/edit-fees";
import { Fees } from "../pages/fees";
import { AddFees } from "../pages/add-fees";

export const fees = [
  {
    element: <Fees />,
    index: true,
  },

  {
    element: <EditFees />,
    path: PATH.Fees.EditFees,
  },

  {
    element: <AddFees />,
    path: PATH.Fees.AddFees,
  },
];
