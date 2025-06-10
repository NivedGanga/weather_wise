export class CityModel {
    city: string
    region: string
    country: string
    id: number
    constructor(city: string, region: string, id: number, country: string) {
        this.city = city
        this.region = region
        this.id = id
        this.country = country
    }

    static fromJSON(json: any): CityModel {
        if (!json) {
            throw new Error('input is null');
        }

        if (!json.id || !json.name || !json.region) {
            throw new Error('missing required properties');
        }

        return new CityModel(
            json.name,
            json.region,
            json.id,
            json.country
        );
    }
}

export class WeatherModel {
    cityModel: CityModel
    temp_c: number
    condition_text: string
    // condition_icon: string
    // condition_code: number
    // wind_kph: number
    // wind_dir: string
    // humidity: number
    // last_updated: string

    constructor(
        cityModel: CityModel,
        temp_c: number,
        condition_text: string,
        // condition_icon: string,
        // condition_code: number,
        // wind_kph: number,
        // wind_dir: string,
        // humidity: number,
        // last_updated: string
    ) {
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

    static fromJSON(json: any): WeatherModel {
        if (!json) {
            throw new Error('input is null');
        }

        if (!json.location || !json.current) {
            throw new Error('missing required properties');
        }

        const cityModel = new CityModel(
            json.location.name,
            json.location.region,
            json.location.id,
            json.location.country
        );

        return new WeatherModel(
            cityModel,
            json.current.temp_c,
            json.current.condition.text,
            // json.current.condition.icon,
            // json.current.condition.code,
            // json.current.wind_kph,
            // json.current.wind_dir,
            // json.current.humidity,
            // json.current.feelslike_c,
        );
    }
}