import Koa from 'koa'
import Router from 'koa-router'
import moment from 'moment-natural'
import { exec } from 'child-process-promise'
import hackfoldr from './hackfoldr'
import typeform from './typeform'
import config from '../config'



// Default values
/* next Saturday */
var default_start_moment = moment.natural('09:00 next saturday');
var default_start_at = default_start_moment.format('YYYY/MM/DD HH:mm');
var default_end_at = moment.natural('18:00 next saturday').format('YYYY/MM/DD HH:mm');
/* 12 days before start date(? */
var default_signup_at = default_start_moment.subtract(12, 'days').add(3, 'hours').format('MM/DD');



// Helpers
const delay = time => value =>
  new Promise(resolve => setTimeout(resolve, time, value))

const dummy = {
  kktix: () => Promise.resolve('done!').then(delay(1000)),
  hackpad: () => Promise.resolve({ stdout: 'padid:\n000000\n:D' }).then(delay(1000)),
  spreadsheet: () => Promise.resolve({ stdout: 'https://example.com\n:D' }).then(delay(1000)),
  hackfoldr: () => Promise.resolve('/000000').then(delay(1000)),
  typeform: () => Promise.resolve({ links: [{}, { href: 'https://example.com' }] }).then(delay(1000)),
}



// Main
var app = new Koa()
var router = new Router()

router
  .get('/', (ctx) => {
    ctx.status = 204
  })
  .post('/kktix', async (ctx) => {
    const times = ''
    const name = ''
    const start_at = ''
    const end_at = ''
    const slug = `g0v-hackath${times}n`
    const cmd = `casperjs --ignore-ssl-errors=yes --ssl-protocol=tlsv1 --slug="${slug}" --name="${name}" --start_at="${start_at}" --end_at="${end_at}" js/kktix.js`

    console.log('建立 KKTIX 活動...')
    //await exec(cmd)
    await dummy.kktix()

    ctx.status = 201
    ctx.body = { url: `https://kktix.com/dashboard/events/${slug}` }
  })
  .post('/hackpad', async (ctx) => {
    const times = ''
    const name = ''
    const start_at = ''
    const end_at = ''
    const cmd = `node js/hackpad.js ${times} ${name} ${start_at} ${end_at}`

    console.log('建立 hackpad...')
    //const { stdout } = await exec(cmd)
    const { stdout } = await dummy.hackpad()
    const padID = stdout.split('\n').slice(-2)[0]

    ctx.status = 201
    ctx.body = { url: `https://g0v.hackpad.com/${padID}` }
  })
  .post('/spreadsheet', async (ctx) => {
    const times = ''
    const name = ''
    const cmd = `node js/spreadsheet.js ${times} ${name}`

    console.log('建立 Google Spreadsheet...')
    //const { stdout } = await exec(cmd)
    const { stdout } = await dummy.spreadsheet()
    const url = stdout.split('\n')[0]

    ctx.status = 201
    ctx.body = { url }
  })
  .post('/hackfoldr', async (ctx) => {
    const times = ''
    const name = ''
    const padID = ''
    const start_at = ''
    const signup_at = ''
    const spreadsheetUrl = ''

    console.log('建立 hackfoldr...')
    //const sheetID = await hackfoldr(times, name, padID, start_at, signup_at, spreadsheetUrl)
    const sheetID = await dummy.hackfoldr()

    ctx.status = 201
    ctx.body = { url: `https://beta.hackfoldr.org${sheetID}` }
  })
  .post('/typeform', async (ctx) => {
    const name = ''

    console.log('建立會後問卷...')
    //const result = await typeform(name)
    const result = await dummy.typeform()

    ctx.status = 201
    ctx.body = { url: result.links[1].href }
  })

const port = process.env.PORT || 3001
app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port)
console.log(`OneButton service listens at port ${port}`)

