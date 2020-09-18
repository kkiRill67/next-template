import { apiref } from '../../../apiref'

export default function handler(req, res) {
  res.status(200).json(apiref)
}
