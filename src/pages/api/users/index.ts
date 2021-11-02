import { NextApiRequest, NextApiResponse } from 'next';
import fauna from 'faunadb';
import User from '../../../interfaces/users/User';
import { api } from '../../../services/api';

const { query } = fauna;
const client = new fauna.Client({ secret: process.env.FAUNA_API_KEY });

interface UsersQueryResponse {
  after?: {
    id: string;
  };
  data: {
    data: User;
    ts: number;
    ref: {
      id: string;
    };
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'POST') {
    const {
      url,
      position,
      name,
      phone,
      email
     } = req.body;



     console.log(url);
    return client
      .query(
        query.Create(query.Collection('users'), {
          data: {
            name,
            phone,
            email,
            url,
            position,
          },
        })
      )
      .then(() => {
        return res.status(201).json({ success: true });
      })
      .catch(err =>
        res
          .status(501)
          .json({ error: `Sorry something Happened! ${err.message}` })
      );
  }

  if (req.method === 'GET') {
    const { after } = req.query;





    const queryOptions = {
      size: 6,
      ...(after && { after: query.Ref(query.Collection('users'), after) }),
    };


 

    return client
      .query<UsersQueryResponse>(
        query.Map(
          query.Paginate(
            query.Documents(query.Collection('users')),
            queryOptions
          ),
          query.Lambda('X', query.Get(query.Var('X')))
        )
      )
      .then(response => {
        const formattedData = response.data.map(item => ({
          ...item.data,
          ts: item.ts,
          id: item.ref.id,
        }));

        return res.json({
          data: formattedData,
          after: response.after ? response.after[0].id : null,
        });
      })
      .catch(err => {
        return res.status(400).json(err);
      });
  }

  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}
