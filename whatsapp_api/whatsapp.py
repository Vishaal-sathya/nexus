import requests

class Whatsapp:
    
        
    # API endpoint
    url = "https://graph.facebook.com/v21.0/525843233940720/messages"

    # Headers
    headers = {
        "Authorization": "ASSTOKEN",  # Replace <access_token> with your actual token
        "Content-Type": "application/json",
        }


    def send_text_all(content,url,headers):
        # Payload
        numbers = [6380520414,6382226812,6383103996]
        for n in numbers:
            payload = {
            "messaging_product": "whatsapp",
            "to": f"91{n}",  # Replace with the recipient's phone number
            "type": "text",
            "text":{
                "body": content
            }
            }
            response = requests.post(url=url,headers=headers,json=payload)
            if response.status_code == 200:
                print(f"Message sent")
                print(f"{response.status_code}")
                print(f"{response.text}")
            else:
                print("Message sent failed")
                print(f"Status code:{response.status_code}")
                print(f"Error code:{response.text}")
    # Payload
    def send_location(lat,longi,name,address,to_number,self):
        location_payload = {
        "messaging_product": "whatsapp",
        "to": f"91{to_number}",
        "type": "location",
        "location": {
            "latitude": f"{lat}",  # Example coordinates for Bangalore
            "longitude": f"{longi}",
            "name": f"{name}",
            "address": f"{address}"
        }
        }
        response = requests.post(self.url,headers=self.headers,json=location_payload)
        if response.status_code == 200:
            print(f"Message sent")
            print(f"{response.text}")
        else:
            print("Message sent failed")
            print(f"Status code:{response.status_code}")
            print(f"Error code:{response.text}")