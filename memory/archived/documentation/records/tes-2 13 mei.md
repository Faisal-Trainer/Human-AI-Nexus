Trajectory ID: e67f5505-4b18-4ab2-96c1-ceb876043299
Error: HTTP 503 Service Unavailable
Sherlog:
TraceID: 0xa1672314c3573110
Headers: {"Alt-Svc":["h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000"],"Content-Length":["474"],"Content-Type":["text/event-stream"],"Date":["Wed, 13 May 2026 08:45:24 GMT"],"Server":["ESF"],"Server-Timing":["gfet4t7; dur=12950"],"Vary":["Origin","X-Origin","Referer"],"X-Cloudaicompanion-Trace-Id":["a1672314c3573110"],"X-Content-Type-Options":["nosniff"],"X-Frame-Options":["SAMEORIGIN"],"X-Xss-Protection":["0"]}

{
"error": {
"code": 503,
"details": [
{
"@type": "type.googleapis.com/google.rpc.ErrorInfo",
"domain": "cloudcode-pa.googleapis.com",
"metadata": {
"OVERLOADED_TOO_MANY_RETRIES_PER_REQUEST": "true",
"model": "gemini-pro-agent"
},
"reason": "MODEL_CAPACITY_EXHAUSTED"
}
],
"message": "No capacity available for model gemini-pro-agent on the server",
"status": "UNAVAILABLE"
}
}
