import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'The Brew',
    description: 'Coffee With A Cause',
    keywords: 'coffee, brew, the brew, merch, beans'
}

export default Meta
