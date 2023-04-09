export default (siblings=[], action)=>{
     switch (action.type) {
        case 'DELETE':
            return siblings.filter((post) => post._id === action.payload);
        case 'UPDATE':
            return siblings.map((post)=> post._id === action.payload._id ? action.payload : post);
        case 'FETCH_ALL':
            return action.payload;
            case 'CREATE':
                return [ ...siblings, action.payload];
                default:
                    return siblings;

             
          
     }
}