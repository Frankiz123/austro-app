import * as loginActions from "./auth";
import * as dashboardActions from "./dashboard";
export const actions = Object.assign({}, loginActions, dashboardActions);
