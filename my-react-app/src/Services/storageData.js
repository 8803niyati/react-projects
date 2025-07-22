export const getStorageData = () => {
    return JSON.parse(localStorage.getItem("products")) || [];
}

export const setStorageData = (data) => {
    localStorage.setItem("products", JSON.stringify(data));
}