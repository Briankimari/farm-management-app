import * as api from '../api/siblings'

// action creator...getting data from api
 export const getPosts=()=> async(dispatch) => {
        try {  
            const { data} = await api.fetchPosts();

            dispatch({type: "FETCH_ALL", payload: data});
        } catch (error) {
            console.log(error.message)
        } 
} 
// action created for sending data to db
export const createPost =(post)=> async (dispatch)=> {
    try {
        const {data} = await api.createPost(post);

        dispatch({ type:'CREATE', payload: data});
    } catch (error) {
        console.log(error);
    }
}
// updating posts
export const updatePost = (id, post) => async (dispatch) => {
    try {
      const {data} =  await api.updatePost(id,post);
 
      dispatch({type: 'UPDATE', payload: data});
    } catch (error) {
        console.log(error);
    }
}
export const deletePost =(id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type:'DELETE', payload: id});
    } catch (error) {
        console.log(error);
    }
}