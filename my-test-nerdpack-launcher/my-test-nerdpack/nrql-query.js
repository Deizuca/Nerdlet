import {NerdGraphQuery} from 'nr1';

export async function nrdbQuery(accountId, nrql){
    const gpl= `{
        actor {
            account(id: ${accountId}) {
                nrql(query: "${nrql}"){
                    results 
                }

            }
        }
    }`

    const {data, error} = await  NerdGraphQuery.query({query: gpl});

    if(error){
        throw ("Bad NRQL");
    }
    return data.actor.account.nrql.results;
}