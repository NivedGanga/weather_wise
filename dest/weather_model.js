export class CityModel {
    constructor(city, region, id, country) {
        this.city = city;
        this.region = region;
        this.id = id;
        this.country = country;
    }
    static fromJSON(json) {
        if (!json) {
            throw new Error('input is null');
        }
        if (!json.id || !json.name || !json.region) {
            throw new Error('missing required properties');
        }
        return new CityModel(json.name, json.region, json.id, json.country);
    }
}
export class WeatherModel {
    // condition_icon: string
    // condition_code: number
    // wind_kph: number
    // wind_dir: string
    // humidity: number
    // last_updated: string
    constructor(cityModel, temp_c, condition_text) {
        this.cityModel = cityModel;
        this.temp_c = temp_c;
        this.condition_text = condition_text;
        // this.condition_icon = condition_icon;
        // this.condition_code = condition_code;
        // this.wind_kph = wind_kph;
        // this.wind_dir = wind_dir;
        // this.humidity = humidity;
        // this.last_updated = last_updated;
    }
    static fromJSON(json) {
        if (!json) {
            throw new Error('input is null');
        }
        if (!json.location || !json.current) {
            throw new Error('missing required properties');
        }
        const cityModel = new CityModel(json.location.name, json.location.region, json.location.id, json.location.country);
        return new WeatherModel(cityModel, json.current.temp_c, json.current.condition.text);
    }
}
