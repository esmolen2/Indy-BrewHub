const api = "https://api.foursquare.com/v2/venues"
const clientID = '5LY2EWSR5WTHB5EDMCFA50LVTTWIQY2LLAOSFMYODULGRY0J';
const clientSecret = '2WQMI3HNVRQ5DWY2N0JK4DKR0QRV1M4LK03YXK3MXTLLT4UJ';
const searchLatLng = '39.768563,-86.158018';
const searchRadius = 3000;
const resultsLimit = 20;
const breweryCategory = '50327c8591d4c4b30a586d5d';
const foursquareVersion = '20180926';

export const getBreweries = () =>
	fetch(`${api}/search?client_id=${clientID}&client_secret=${clientSecret}&v=${foursquareVersion}&ll=${searchLatLng}&intent=browse&radius=${searchRadius}&limit=${resultsLimit}&categoryId=${breweryCategory}`)
		.then(res => res.json())
		.then(res => res.response.venues)
