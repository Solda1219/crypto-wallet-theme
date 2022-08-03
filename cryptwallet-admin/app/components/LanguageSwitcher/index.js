import React from 'react';

import { injectIntl } from 'react-intl';
import { Grid, MenuItem, Select, Typography } from '@material-ui/core'
import ReactCountryFlag from 'react-country-flag';
import './style.scss'

const languages = [
    { countryFlag: 'gb', languageName: 'en', value: 'en' },
    { countryFlag: 'de', languageName: 'de', value: 'de' },
    { countryFlag: 'fr', languageName: 'fr', value: 'fr' },
    { countryFlag: 'pt', languageName: 'pt', value: 'pt' },
    { countryFlag: 'in', languageName: 'hi', value: 'hi' },
    { countryFlag: 'jp', languageName: 'jp', value: 'ja' },
    { countryFlag: 'cn', languageName: 'cn', value: 'zh' },
]

/* eslint-disable react/prefer-stateless-function */
class LanguageSwitcher extends React.Component {
    t(msg, values) {
        return this.props.intl.formatMessage(msg, values);
    }

    render() {
        return (
            <Grid className="LanguageSwitcher">
                <Select
                    inputProps={{
                        name: 'lang',
                        id: 'lang',
                        className: "languageSelectWrap"
                    }}
                    value={this.props.locale}
                    onChange={e => {
                        this.props.onChange(e.target.value);
                    }}
                    className="languageSwitcher"

                >
                    {languages.map(language => (
                        <MenuItem key={language.value} value={language.value}>
                            <ReactCountryFlag
                                className="countryFlag"
                                code={language.countryFlag}
                                styleProps={{
                                    width: '15px'
                                }}
                                svg
                            />
                            <Typography className="countryName" component="span">{language.languageName}</Typography>
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
        );
    }
}
export default injectIntl(LanguageSwitcher);
