

module.exports =  (query) => {
    let filterStatus = [
        { name: "Tất cả", value: "", class: "" },
        { name: "Hoạt Động", value: "active", class: "" },
        { name: "Ngừng Hoạt Động", value: "inactive", class: "" }
    ];
    if(query.status){
          const index = filterStatus.findIndex(f => f.value === query.status);
          filterStatus[index].class = "active";
    } else {
        const index = filterStatus.findIndex(f => f.value === "");
          filterStatus[index].class = "active";

    }
    return filterStatus;
}