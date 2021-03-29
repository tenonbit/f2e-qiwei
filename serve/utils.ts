import * as http from 'http'
import { Stream } from 'stream'

interface FetchRes<T = any> {
    buffer: Buffer;
    text: () => string;
    json: () => T;
}

export const Fetch = <T>(url: string, body?: Stream, options: http.RequestOptions = {}): Promise<FetchRes<T>> => new Promise(function (resolve, reject) {
    const req = http.request(url, options, function (res) {
        let chunk = []
        res.on('data', function (data) {
            chunk.push(data)
        }).on('end', function () {
            const buffer = Buffer.concat(chunk)
            resolve({
                buffer,
                text: () => buffer.toString(),
                json: () => JSON.parse(buffer.toString()),
            })
        })
        res.on('error', reject)
    })
    req.on('error', reject)
    if (body) {
        body.pipe(req)
    } else {
        req.end()
    }
})