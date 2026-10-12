import { endpoints } from "../config/endpoints";
import { callEndpoint } from "./apiClient";
import { mapCharger, mapList } from "./mappers";

export const chargerService = {
  async getAll() {
    const raw = await callEndpoint(endpoints.chargers);
    return mapList(raw, mapCharger);
  },
};
