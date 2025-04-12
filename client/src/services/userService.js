import api from "../utils/axiosConfig";

const getProfile = () => api.get("/user/getProfile");
const updateAddressService = (data) => api.put("/user/update-address", data);





export {
    getProfile,updateAddressService
}