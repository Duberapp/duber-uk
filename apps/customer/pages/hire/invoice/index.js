import React from 'react'

const Index = () => {
    return (
        <div>Index</div>
    )
}

export default Index

export const getServerSideProps = async ({ query }) => {
    return {
        redirect: {
            destination: '/hire',
            permanent: false,
        },
    }
}