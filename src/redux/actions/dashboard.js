import apiActions from '@apis';
export const getMerchants = (params) => {
	return apiActions
		.getMerchants(params)
		.then((resp) => {
			return resp;
		})
		.catch((e) => {
			console.log('getMerchants errr is ---', e);
			throw e;
		});
};
export const getItems = (params) => {
	return apiActions
		.getItems(params)
		.then((resp) => {
			return resp;
		})
		.catch((e) => {
			console.log('getItems errr is ---', e);
			throw e;
		});
};
export const getMedicalStores = (params) => {
	return apiActions
		.getMedicalStores(params)
		.then((resp) => {
			return resp;
		})
		.catch((e) => {
			console.log('get Medical Store errr is ---', e);
			throw e;
		});
};

export const getOrders = (params) => {
	return apiActions
		.getOrders(params)
		.then((resp) => {
			return resp;
		})
		.catch((e) => {
			console.log('get Orders errr is ---', e);
			throw e;
		});
};
export const sendLocation = (params) => {
	return apiActions
		.sendLocation(params)
		.then((resp) => {
			return resp;
		})
		.catch((e) => {
			console.log('send location errr is ---', e);
			throw e;
		});
};
export const getJourney = (params) => {
  return apiActions
    .getJourney(params)
    .then((resp) => {
      return resp;
    })
    .catch((e) => {
      console.log("get Journey errr is ---", e);
      throw e;
    });
};
