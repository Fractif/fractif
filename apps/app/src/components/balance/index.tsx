import { useQuery } from "graphql-helper"

export const BALANCE_QUERY = `
    query balance($id: String!){
        erc1155Balance(id: $id) {
            id
            value
        }
    }
`

const variables = {id: '0xd0b8ba8eeee4425dd97c4b13757f778045677710/0x0/0x932848f2266650e7708510fcce5e5cbcb9bb2e20'}

export const balanceOptions = () => ({
    variables
})

const Balance = () => {
    const { loading, error, data, refetch } = useQuery(BALANCE_QUERY, {variables})
    
    if (data) {
        console.log(data)
        return <div>{data.erc1155Balance.value}</div>
    }

    return (
        <div>Data not fetched</div>
    )
}

export default Balance