module.exports = (objPanagination, query, countProducts) => {
    if(query.page){
    objPanagination.currentPage = parseInt(query.page);
   }
   objPanagination.skip = (objPanagination.currentPage - 1) * objPanagination.limitItem;
   
   //tong so san pham
   
   const totalPage = Math.ceil(countProducts / objPanagination.limitItem);
   objPanagination.totalPage = totalPage;
   return objPanagination;
}