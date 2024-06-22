import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IIngredientTypeTemplateStepCreate,
  IIngredientTypeTemplateSteps,
  ITemplates,
} from "../../models/IngredientTypeTemplateSteps";
import axiosInstance from "../api/axiosInstance";
import {
  deleteIngredientTypeTemplateStepEndpoint,
  getIngredientTypeTemplateStepByIdEndpoint,
  getIngredientTypeTemplateStepsEndpoint,
  updateStatusIngredientTypeTemplateStepEndpoint,
} from "../api/apiConfig";
import { toast } from "react-toastify";

type IngredientTypeTemplateStepState = {
  loading: boolean;
  ingredientTypeTemplateSteps: IIngredientTypeTemplateSteps[] | null;
  ingredientTypeTemplateStep: ITemplates | null;
  createIngredientTypeTemplateStep: IIngredientTypeTemplateStepCreate | null;
  error: string[] | unknown;
  success: boolean;
};

const initialState: IngredientTypeTemplateStepState = {
  loading: false,
  ingredientTypeTemplateSteps: null,
  createIngredientTypeTemplateStep: null,
  ingredientTypeTemplateStep: null,
  error: null,
  success: false,
};

export const getAllIngredientTypeTemplateSteps = createAsyncThunk<
  IIngredientTypeTemplateSteps[],
  { ProductTemplateId: number }
>(
  "ingredientTypeTemplateSteps/getAllIngredientTypeTemplateSteps",
  async ({ ProductTemplateId }, thunkAPI) => {
    try {
      const token = sessionStorage.getItem("quickServeToken");
      const response = await axiosInstance.get(
        `${getIngredientTypeTemplateStepsEndpoint}?ProductTemplateId=${ProductTemplateId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errorMessages || "Unknown error",
      );
    }
  },
);

export const getIngredientTypeTemplateStepById = createAsyncThunk<
  ITemplates,
  { templateStepId: number }
>(
  "ingredientTypeTemplateSteps/getIngredientTypeTemplateStepById",
  async (data, thunkAPI) => {
    const { templateStepId } = data;
    try {
      const token = sessionStorage.getItem("quickServeToken");
      const response = await axiosInstance.get(
        `${getIngredientTypeTemplateStepByIdEndpoint}/${templateStepId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errorMessages || "Unknown error",
      );
    }
  },
);
export const createIngredientTypeTemplateStep = createAsyncThunk<
  IIngredientTypeTemplateStepCreate,
  Object
>(
  "ingredientTypeTemplateSteps/createIngredientTypeTemplateStep",
  async (ingredientTypeTemplateStep, thunkAPI) => {
    try {
      const token = sessionStorage.getItem("quickServeToken");
      const response = await axiosInstance.post(
        getIngredientTypeTemplateStepsEndpoint,
        ingredientTypeTemplateStep,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        toast.success("Tạo loại nguyên liệu cho bước thành công !");
      } else {
        toast.error(`${response.data.errors[0].description}`);
      }
      return response.data.data;
    } catch (error: any) {
      toast.error(`${error.response.data.errors[0].description}`);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateStatusIngredientTypeTemplateStep = createAsyncThunk<
  IIngredientTypeTemplateStepCreate,
  { productTemplateId: number }
>(
  "ingredientTypeTemplateSteps/updateStatusIngredientTypeTemplateStep",
  async ({ productTemplateId }, thunkAPI) => {
    try {
      const token = sessionStorage.getItem("quickServeToken");
      const response = await axiosInstance.put(
        `${updateStatusIngredientTypeTemplateStepEndpoint}/${productTemplateId}/status`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        toast.success("Cập nhật trạng thái các bước trong mẫu thành công!");
      } else {
        toast.error(`${response.data.errors[0].description}`);
      }
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        toast.error(`${error.response.data.errors[0].description}`),
      );
    }
  },
);

export const deleteIngredientTypeTemplateStepById = createAsyncThunk<
  void,
  { id: number }
>(
  "ingredients/deleteIngredientTypeTemplateStepById",
  async ({ id }, thunkAPI) => {
    try {
      const token = sessionStorage.getItem("quickServeToken");
      const response = await axiosInstance.delete(
        `${deleteIngredientTypeTemplateStepEndpoint}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        toast.success("Xóa các loại nguyên liệu thành công !");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        toast.error(`${error.response.data.errors[0].description}`),
      );
    }
  },
);
export const activeProductTempalte = createAsyncThunk<IIngredientTypeTemplateStepCreate, { productTemplateId: number }>
  ('ingredientTypeTemplateSteps/activeIngredientTypeTemplateStepById', async ({ productTemplateId }, thunkAPI) => {
    try {
      const token = sessionStorage.getItem("quickServeToken");
      const response = await axiosInstance.put(
        `${updateStatusIngredientTypeTemplateStepEndpoint}/${productTemplateId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success) {
        toast.success('Kích hoạt loại nguyên liệu cho bước thành công !');
      } else {
        toast.error(`${response.data.errors[0].description}`);
      }
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(toast.error(`${error.response.data.errors[0].description}`));
    }
  });

const ingredientTypeTemplateStepsSlice = createSlice({
  name: "ingredientTypeTemplateSteps",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    //handle create ingredient type template step
    builder.addCase(getAllIngredientTypeTemplateSteps.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllIngredientTypeTemplateSteps.fulfilled,
      (state, action) => {
        state.loading = false;
        state.ingredientTypeTemplateSteps = action.payload;
      },
    );
    builder.addCase(
      getAllIngredientTypeTemplateSteps.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
    //handle get ingredient type template step by id
    builder.addCase(getIngredientTypeTemplateStepById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getIngredientTypeTemplateStepById.fulfilled,
      (state, action) => {
        state.loading = false;
        state.ingredientTypeTemplateStep = action.payload;
      },
    );
    builder.addCase(
      getIngredientTypeTemplateStepById.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
    //handle create ingredient type template step
    builder.addCase(createIngredientTypeTemplateStep.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createIngredientTypeTemplateStep.fulfilled,
      (state, action) => {
        state.loading = false;
        state.createIngredientTypeTemplateStep = action.payload;
      },
    );
    builder.addCase(
      createIngredientTypeTemplateStep.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    );

    //handle update status ingredient type template step
    builder.addCase(updateStatusIngredientTypeTemplateStep.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateStatusIngredientTypeTemplateStep.fulfilled,
      (state) => {
        state.loading = false;
        state.success = true;
      },
    );
    builder.addCase(
      updateStatusIngredientTypeTemplateStep.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    );

    // handle active product template
    builder.addCase(activeProductTempalte.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(activeProductTempalte.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(activeProductTempalte.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setError } = ingredientTypeTemplateStepsSlice.actions;
export default ingredientTypeTemplateStepsSlice.reducer;
