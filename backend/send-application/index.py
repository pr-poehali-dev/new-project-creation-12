import json
import os
import urllib.request
import urllib.parse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_telegram(name: str, phone: str, grade: str, comment: str):
    """Отправка заявки в Telegram"""
    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']

    text = (
        f"📋 <b>Новая заявка с сайта!</b>\n\n"
        f"👤 <b>Имя:</b> {name}\n"
        f"📞 <b>Телефон:</b> {phone}\n"
        f"🏫 <b>Класс:</b> {grade or 'не указан'}\n"
        f"💬 <b>Комментарий:</b> {comment or 'нет'}"
    )

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML'
    }).encode()

    req = urllib.request.Request(url, data=data)
    urllib.request.urlopen(req, timeout=10)


def send_email(name: str, phone: str, grade: str, comment: str):
    """Отправка заявки на email через mail.ru SMTP"""
    to_email = os.environ['NOTIFY_EMAIL']

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта — {name}'
    msg['From'] = to_email
    msg['To'] = to_email

    body = (
        f"Новая заявка с сайта FamilyClassIstra\n\n"
        f"Имя: {name}\n"
        f"Телефон: {phone}\n"
        f"Класс: {grade or 'не указан'}\n"
        f"Комментарий: {comment or 'нет'}"
    )
    msg.attach(MIMEText(body, 'plain', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465, timeout=10) as server:
        server.login(to_email, os.environ.get('EMAIL_PASSWORD', ''))
        server.sendmail(to_email, to_email, msg.as_string())


def handler(event: dict, context) -> dict:
    """Приём заявки с формы и отправка в Telegram и на почту"""
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    raw = event.get('body') or '{}'
    if isinstance(raw, str):
        raw = json.loads(raw)
    if isinstance(raw, str):
        raw = json.loads(raw)
    body = raw
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    grade = body.get('grade', '').strip()
    comment = body.get('comment', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }

    errors = []

    try:
        send_telegram(name, phone, grade, comment)
    except Exception as e:
        errors.append(f'telegram: {e}')

    try:
        send_email(name, phone, grade, comment)
    except Exception as e:
        errors.append(f'email: {e}')

    if len(errors) == 2:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': 'Не удалось отправить уведомление'})
        }

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'ok': True, 'warnings': errors})
    }