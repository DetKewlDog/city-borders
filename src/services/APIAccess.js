import axios from 'axios';

class APIAccess {
    static async fetchCityGeometry(city) {
        const query = `[out:json];
        (
        rel["name:en"~"${city}"]["place"];
        area["name:en"~"${city}"]["place"];
        way["name:en"~"${city}"]["place"];
        node["name:en"~"${city}"]["place"];
        );
        out geom;`
        return axios.get("https://lz4.overpass-api.de/api/interpreter", { params: { data: query } })
            .then(result => result.data)
            .then(data => {
                let result = data.elements.map(element => {

                    function getGeometry(element) {
                        return element?.geometry?.map(i => [i.lat, i.lon])
                            .filter(i => i !== undefined);
                    }

                    if (element.type === 'relation') {
                        return element.members.map(i => getGeometry(i))
                            .flat(1).filter(i => i !== undefined);
                    }
                    return getGeometry(element);

                }).filter(i => i !== undefined);

                if (result.length > 1) {
                    const lengths = result.map(i => i.length);
                    const index = lengths.indexOf(Math.max(...lengths));
                    result = [ result[index] ];
                }
                return result;
            })
    }
}

export default APIAccess;