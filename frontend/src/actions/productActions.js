import {
    ProductActionTypes,
    ProductCreateActionTypes,
    ProductCreateReviewActionTypes,
    ProductDeleteActionTypes,
    ProductDetailsActionTypes,
    ProductUpdateActionTypes
} from "../constants/actionTypes/productActionTypes";
import axios from 'axios'
import { getErrorAction } from "../utils/utils";
import { HttpHeaders } from "../models/HttpHeaders";
import { contentTypes } from "../constants/contentTypes";

export const listProducts = (searchKeyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({type: ProductActionTypes.PRODUCT_LIST_REQUEST})

        const { data } = await axios.get(`/v1/api/products?keyword=${searchKeyword}&pageNumber=${pageNumber}`)

        dispatch({
            type: ProductActionTypes.PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch(getErrorAction(ProductActionTypes.PRODUCT_LIST_FAIL, error))
    }
}

export const listProductDetails = (productId) => async (dispatch) => {
    try {
        dispatch({type: ProductDetailsActionTypes.PRODUCT_DETAILS_REQUEST})

        const { data } = await axios.get(`/v1/api/products/${productId}`)

        dispatch({type: ProductDetailsActionTypes.PRODUCT_DETAILS_SUCCESS, payload: data})
    } catch (error) {
        dispatch(getErrorAction(ProductDetailsActionTypes.PRODUCT_DETAILS_FAIL, error))
    }
}

export const deleteProduct = (id) => async(dispatch, getState) => {
    try {
      dispatch({type: ProductDeleteActionTypes.PRODUCT_DELETE_REQUEST})
  
      const {userLogin: {userInfo}} = getState()
  
      const httpHeaders = new HttpHeaders()
      httpHeaders.setBearerToken(userInfo.token)
  
      await axios.delete(`/v1/api/products/${id}`, httpHeaders)
      dispatch({type: ProductDeleteActionTypes.PRODUCT_DELETE_SUCCESS})
    } catch (error) {
      dispatch(getErrorAction(ProductDeleteActionTypes.PRODUCT_DELETE_FAIL, error))
    }
  }

  export const createProduct = () => async(dispatch, getState) => {
    try {
      dispatch({type: ProductCreateActionTypes.PRODUCT_CREATE_REQUEST})
  
      const {userLogin: {userInfo}} = getState()
  
      const httpHeaders = new HttpHeaders()
      httpHeaders.setBearerToken(userInfo.token)
  
      const { data } = await axios.post(`/v1/api/products`, {}, httpHeaders)
      dispatch({
        type: ProductCreateActionTypes.PRODUCT_CREATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch(getErrorAction(ProductCreateActionTypes.PRODUCT_CREATE_FAIL, error))
    }
  }

  export const updateProduct = (product) => async(dispatch, getState) => {
    try {
      dispatch({type: ProductUpdateActionTypes.PRODUCT_UPDATE_REQUEST})
  
      const {userLogin: {userInfo}} = getState()
  
      const httpHeaders = new HttpHeaders()
      httpHeaders.setContentType(contentTypes.APPLICATION_JSON);
      httpHeaders.setBearerToken(userInfo.token)
  
      const { data } = await axios.put(`/v1/api/products/${product._id}`, product, httpHeaders)
      dispatch({
        type: ProductUpdateActionTypes.PRODUCT_UPDATE_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch(getErrorAction(ProductUpdateActionTypes.PRODUCT_UPDATE_FAIL, error))
    }
  }

  export const createProductReview = (productId, review) => async(dispatch, getState) => {
    try {
      dispatch({type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_REQUEST})
  
      const {userLogin: {userInfo}} = getState()
  
      const httpHeaders = new HttpHeaders()
      httpHeaders.setContentType(contentTypes.APPLICATION_JSON);
      httpHeaders.setBearerToken(userInfo.token)
  
      await axios.post(`/v1/api/products/${productId}/reviews`, review, httpHeaders)

      dispatch({type: ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS});
    } catch (error) {
      dispatch(getErrorAction(ProductCreateReviewActionTypes.PRODUCT_CREATE_REVIEW_FAIL, error))
    }
  }