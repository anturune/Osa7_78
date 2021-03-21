import { useState, useEffect } from 'react'
import axios from 'axios'

//Tällä hallitaan input-kenttään syötettävä data
export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }
    //console.log('MIKÄ VALUE', value)
    return {
        type,
        value,
        onChange
    }
}

//Tällä hallitaan maan tietojen hakeminen "restcountries.eu" -saitilta
export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    //console.log('TULEEKO USECOUNTRYYN', name)
    useEffect(() => {
        console.log('effect')
        //Haetaan maa "name" -paramterin mukaisesti "restcountries.eu" -sivuilta
        axios
            .get('https://restcountries.eu/rest/v2/name/' + `${name}` + '?fullText=true')
            .then(response => {
                //Response dataan lisätään yksi uusi avain-arvo pari ja asetaan trueksi
                //Koska maa löytyi ja päivitetään tila
                setCountry({ ...response.data, found: true })
            })
            //Jos ei löydy, catchataan virhe ja tila muutetaan siten, että found arvoksi false
            .catch((error) => {
                //console.log('Wrong URL:', error.message)
                //console.log(country)
                setCountry({ ...country, found: false })
            })
        //Laitetaan toiseksi parametriksi "name", jotta useEffect ajetaan vain jos hakukenttään kirjoitettua
        //arvoa muutetaan
    }, [name])


    //Jos statessa on maa ja maan found-arvo on true, otetaan palautettavaksi indeksissä 0-oleva maa
    //Ja lisätään sille attribuutiksi "found:true", jotta menee läpi "App.js" filessä olevasta if-lause
    //viidakosta ja maa renderöityy selaimeen
    if (country && country.found) {
        //console.log('COUNTRYN ARVO ERRORIN JÄLKEEN', country.found)
        const maa = { ...country[0], found: true }
        return maa
    }
    return country
}