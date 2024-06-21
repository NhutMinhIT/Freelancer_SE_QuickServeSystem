import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import CommonTable from "../CommonTable/CommonTable";
import { MRT_ColumnDef } from "material-react-table";
import { IIngredientTypesTemplate } from "../../models/IngredientTypeTemplateSteps";
import { useAppDispatch, useAppSelector } from "../../services/store/store";
import { deleteIngredientTypeTemplateStepById } from "../../services/features/IngredientTypeTemplateStepSlice";

const columns: MRT_ColumnDef<IIngredientTypesTemplate>[] = [
  {
    accessorKey: "name",
    header: "Tên nguyên liệu",
  },
  {
    accessorKey: "quantityMin",
    header: "Số lượng tối thiểu",
  },
  {
    accessorKey: "quantityMax",
    header: "Số lượng tối đa",
  },
];

type PopupGetAllTemplateStepIdProps = {
  openGetAllTemplateStepId: boolean;
  handleCloseAllTemplateStepId: () => void;
};

const PopupGetAllTemplateStepId: React.FC<PopupGetAllTemplateStepIdProps> = ({
  openGetAllTemplateStepId,
  handleCloseAllTemplateStepId,
}) => {
  const dispatch = useAppDispatch();
  const { ingredientTypeTemplateStep, loading } = useAppSelector(
    (state) => state.ingredientTypeTemplateSteps,
  );

  const handleDeleteIngredientTypeTemplateStep = () => {
    dispatch(
      deleteIngredientTypeTemplateStepById({
        id: ingredientTypeTemplateStep?.templateStepId as number,
      }),
    )
      .unwrap()
      .then(() => {
        handleCloseAllTemplateStepId();
      });
  };

  return (
    <Dialog
      open={openGetAllTemplateStepId}
      onClose={handleCloseAllTemplateStepId}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle>Loại nguyên liệu của bước</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <CommonTable
            columns={columns}
            data={ingredientTypeTemplateStep?.ingredientTypes || []}
            toolbarButtons={
              <Button
                variant="contained"
                onClick={handleDeleteIngredientTypeTemplateStep}
                sx={{
                  color: "white",
                  backgroundColor: "red",
                  ":hover": {
                    backgroundColor: "#de5950",
                  },
                }}
                disabled={
                  ingredientTypeTemplateStep?.ingredientTypes?.length === 0
                }
              >
                Xóa nguyên liệu
              </Button>
            }
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PopupGetAllTemplateStepId;
