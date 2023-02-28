import { config } from 'dotenv'
import telerivet from 'telerivet'

config()

const tr = new telerivet.API(process.env.TR_KEY)
const project = tr.initProjectById(process.env.TR_PROJECT_ID)

export default project
