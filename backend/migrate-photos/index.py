import os
import urllib.request
import hmac
import hashlib
import datetime
import json


def sign(key, msg):
    return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()


def get_signature_key(secret, date, region, service):
    k_date = sign(('AWS4' + secret).encode('utf-8'), date)
    k_region = sign(k_date, region)
    k_service = sign(k_region, service)
    return sign(k_service, 'aws4_request')


def upload_to_s3(data, s3_key, access_key, secret_key):
    bucket = 'files'
    host = 'bucket.poehali.dev'
    region = 'us-east-1'
    now = datetime.datetime.utcnow()
    amz_date = now.strftime('%Y%m%dT%H%M%SZ')
    date_stamp = now.strftime('%Y%m%d')

    payload_hash = hashlib.sha256(data).hexdigest()
    canonical_headers = (
        f'content-type:image/jpeg\n'
        f'host:{host}\n'
        f'x-amz-content-sha256:{payload_hash}\n'
        f'x-amz-date:{amz_date}\n'
    )
    signed_headers = 'content-type;host;x-amz-content-sha256;x-amz-date'
    canonical_request = '\n'.join([
        'PUT', f'/{bucket}/{s3_key}', '',
        canonical_headers, signed_headers, payload_hash
    ])
    credential_scope = f'{date_stamp}/{region}/s3/aws4_request'
    string_to_sign = '\n'.join([
        'AWS4-HMAC-SHA256', amz_date, credential_scope,
        hashlib.sha256(canonical_request.encode('utf-8')).hexdigest()
    ])
    signing_key = get_signature_key(secret_key, date_stamp, region, 's3')
    signature = hmac.new(signing_key, string_to_sign.encode('utf-8'), hashlib.sha256).hexdigest()
    authorization = (
        f'AWS4-HMAC-SHA256 Credential={access_key}/{credential_scope}, '
        f'SignedHeaders={signed_headers}, Signature={signature}'
    )

    url = f'https://{host}/{bucket}/{s3_key}'
    req = urllib.request.Request(url, data=data, method='PUT')
    req.add_header('Host', host)
    req.add_header('Content-Type', 'image/jpeg')
    req.add_header('x-amz-content-sha256', payload_hash)
    req.add_header('x-amz-date', amz_date)
    req.add_header('Authorization', authorization)
    with urllib.request.urlopen(req) as resp:
        return resp.status


def handler(event: dict, context) -> dict:
    """Скачивает фото со старого сайта и загружает в S3"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}, 'body': ''}

    access_key = os.environ['AWS_ACCESS_KEY_ID']
    secret_key = os.environ['AWS_SECRET_ACCESS_KEY']

    photos = {
        'photo1': 'https://familyclassistra.ru/wp-content/uploads/2023/08/xz_2mi6XIQs.jpg',
        'photo2': 'https://familyclassistra.ru/wp-content/uploads/2023/08/zsZvA15cu_4-1.jpg',
        'photo3': 'https://familyclassistra.ru/wp-content/uploads/2023/08/sg9FkcE1gWE.jpg',
        'photo4': 'https://familyclassistra.ru/wp-content/uploads/2023/08/x9XlMKhGHQc.jpg',
    }

    results = {}
    for key, url in photos.items():
        filename = url.split('/')[-1]
        s3_key = f'school-photos/{filename}'
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
        upload_to_s3(data, s3_key, access_key, secret_key)
        results[key] = f'https://cdn.poehali.dev/projects/{access_key}/bucket/{s3_key}'

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps(results)
    }
