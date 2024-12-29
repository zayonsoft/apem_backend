from django.http import JsonResponse
from django.contrib import auth 
from django.contrib.auth.models import User
from django.urls import reverse
from apemapp.models import BankAccount, Sermon, Profile
from django.db.models import Q 
from datetime import datetime

from apemapp.decorators import async_unauthenticated_user, async_authenticated_user

def confirmUserDetail(email_or_username):
    if User.objects.filter(username=email_or_username).exists() or User.objects.filter(email = email_or_username).exists():
        return True
    else:
        return False
    

def validateUser(request, username, password):
    user = auth.authenticate(username=username, password=password)
    if user is not None:
        auth.login(request,user)
        data={"success":True,"message":"Login Successful!<br />Redirecting...",
            "next_url": reverse("home") ,
        }
        return data
    else:
        data={"success":False, "message":"Invalid Login Credentials", "next_url":""}
        return data


def postLogin(request):
    data = {"message": "Unable to Handle this Request at the Moment!", "success": False}
    if request.method == "POST":
        username_or_mail = request.POST.get("id_or_email")
        password = request.POST.get("password")
        
        #if no username or email matches
        if not confirmUserDetail(username_or_mail):
            data={
                "message":"Invalid Username or Email", "success":False,"next_url":"",
            }
            return JsonResponse(data)
        
        #if there is a matching username log that user in using the email
        elif User.objects.filter(username = username_or_mail).exists():
            data =  validateUser(request, username_or_mail, password)
            return JsonResponse(data)
        
        #if there is an email like that find the username and validate it
        elif User.objects.filter(email = username_or_mail).exists():
            username = User.objects.get(email=username_or_mail).username
            data = validateUser(request, username, password)
            return JsonResponse(data)
    
    return JsonResponse(data)


# Bank Account Creation Function

def getAccounts(request):
    data = {"message": "No Data Available", "success":False, "account_list":[]}
    search_value = request.GET.get("search_value")
    print(search_value)
    if search_value and search_value.strip() :
        search_value = search_value.strip()
        accounts = BankAccount.objects.filter(
            Q(account_name__icontains = search_value) |
            Q(account_number__icontains = search_value) 
            |Q(bank_name__icontains = search_value) 
        )
    else:
        accounts = BankAccount.objects.all()
        
    account_list = []
    for account in accounts:
        acc_data = {
            "pk":account.id,
            "account_name":account.account_name,
            "account_number":account.account_number,
            "bank_name":account.bank_name,
        }
        account_list.append(acc_data)
    
    if len(account_list) == 0:
        data = {"message": "No Data Available", "success":False, "account_list": account_list}
        return JsonResponse(data)
    else:
        data = {"message": "Successful", "success":True, "account_list": account_list}
        return JsonResponse(data)


def createAccount(request):
    data = {"message": "Unable to Process Request", "success": False}
    if request.method == "POST":
        account_name = request.POST.get("account_name")
        account_number = request.POST.get("account_number")
        bank_name = request.POST.get("bank_name")
        
        if not (account_name and account_name.strip()) :
            data = {"message": "Account Name Cannot be Empty", "success": False}
            return JsonResponse(data)
        
        if not (account_number and account_number.strip()):
            data = {"message": "Account Number Cannot be Empty", "success": False}
            return JsonResponse(data)
        
        if not (bank_name and bank_name.strip()):
            data = {"message": "Bank Cannot be Empty", "success": False}
            return JsonResponse(data)
        
        account_name = account_name.strip()
        account_number = account_number.strip()
        bank_name = bank_name.strip()
        
        
        if BankAccount.objects.filter(account_name__iexact = account_name, account_number__iexact = account_number, bank_name__iexact = bank_name ).exists():
            data = {"message": "Duplicate Bank Account! Account Already Exists", "success": False}
            return JsonResponse(data)
        
        BankAccount.objects.create(account_name = account_name, account_number = account_number, bank_name = bank_name )
        data = {"message": "Created New Account!", "success":True}
        return JsonResponse(data)
        
    return JsonResponse(data)


def editAccount(request):
    data = {"message": "Unable to Process Request", "success": False}
    if request.method == "POST":
        account_pk = request.POST.get("account_pk")        
        old_account_number = request.POST.get("old_account_number")
        
        account_name = request.POST.get("account_name")
        account_number = request.POST.get("account_number")
        bank_name = request.POST.get("bank_name")
        
        if not account_pk.isdigit():
            data = {"message": "Invalid Account!", "success": False}
            return JsonResponse(data)
            
        if not BankAccount.objects.filter(id = account_pk, account_number = old_account_number).exists():
            data = {"message": "Account Doesnot Exists!", "success": False}
            return JsonResponse(data)
            
        account = BankAccount.objects.get(id = account_pk, account_number = old_account_number)    
        
        if not (account_name and account_name.strip()) :
            data = {"message": "Account Name Cannot be Empty", "success": False}
            return JsonResponse(data)
        
        if not (account_number and account_number.strip()):
            data = {"message": "Account Number Cannot be Empty", "success": False}
            return JsonResponse(data)
        
        if not (bank_name and bank_name.strip()) :
            data = {"message": "Bank Cannot be Empty", "success": False}
            return JsonResponse(data) 
        
        account_name = account_name.strip()
        account_number = account_number.strip()
        bank_name = bank_name.strip()
        
        if account.account_name == account_name and account.account_number == account_number and account.bank_name == bank_name:
            data = {"message": "No Changes Made!", "success": False}
            return JsonResponse(data) 
        
        if BankAccount.objects.filter(account_name = account_name, account_number = account_number, bank_name = bank_name ).exists():
            data = {"message": "Duplicate Bank Account! Account Already Exists", "success": False}
            return JsonResponse(data)
        
        account.account_name = account_name
        account.account_number = account_number
        account.bank_name = bank_name
        account.save()
        
        data = {"message":"Successfully Updated", "success":True}
        return JsonResponse(data)
        
    return JsonResponse(data)


def deleteAccount(request):
    data = {"message":"Unable to Handle This Request!", "success":False}
    if request.method == "POST":
        account_pk = request.POST.get("account_pk")
        account_number = request.POST.get("account_number")
        if not (account_pk and account_pk.isdigit() ):
            data = {"message": "Invalid Account", "success":False}
            return JsonResponse(data)
        
        if not  BankAccount.objects.filter(id = account_pk, account_number = account_number).exists():
            data = {"message": "Account Doesn't Exists!", "success":False}
            return JsonResponse(data)
        
        account = BankAccount.objects.get(id = account_pk, account_number = account_number)
        account.delete()
        data = {"message": "Account Deleted Successfully", "success":True}
        return JsonResponse(data)
        
    return JsonResponse(data)


def getSermons(request):
    data = {"message": "No Data Available", "success":False, "sermon_list":[]}
    search_value = request.GET.get("search_value")
 
    if search_value and search_value.strip():
        search_value = search_value.strip()
        
        sermons = Sermon.objects.filter(
            Q(title__icontains = search_value) |
            Q(body__icontains = search_value) 
            |Q(poster__username__icontains = search_value) 
            |Q(poster__last_name__icontains = search_value) 
            |Q(poster__first_name__icontains = search_value) 
        )
    else:
        sermons = Sermon.objects.all()
        
    sermon_list = []
    for sermon in sermons:
        sermon_data = {
            "pk":sermon.id,
            "title":sermon.title,
            "body":sermon.body,
            "date": datetime.strftime(sermon.date_posted, "%B %d, %Y. %H:%M") ,
        }
        if sermon.poster:
            sermon_data["poster"] = sermon.poster.username
        else:
            sermon_data["poster"] = "Unknown User"
            
            
        sermon_list.append(sermon_data)
    
    if len(sermon_list) == 0:
        data = {"message": "No Data Available", "success":False, "sermon_list": sermon_list}
        return JsonResponse(data)
    else:
        data = {"message": "Successful", "success":True, "sermon_list": sermon_list}
        return JsonResponse(data)


@async_authenticated_user
def createSermon(request):
    data = {"message":"Unable to Handle This Request!", "success":False}
    if request.method == "POST":
        title = request.POST.get("title")
        body = request.POST.get("body")
        
        if not (title and title.strip() ):
            data = {"message":"Sermon Must Have a Title", "success":False}
            return JsonResponse(data)
        
        if not (body and body.strip() ):
            data = {"message":"Sermon Should Have a Content", "success":False}
            return JsonResponse(data)
        
        title = title.strip()
        body = body.strip()
        
        poster = request.user
        
        
        Sermon.objects.create(
            title = title,
            body = body,
            poster = poster
        )
        
        data = {"message":"Sermon Created Successfully", "success":True}
        return JsonResponse(data)
        
    return JsonResponse(data)


def editSermon(request):
    data = {"message":"Unable to Handle This Request!", "success":False}
    if request.method == "POST":
        
        sermon_pk = request.POST.get("sermon_pk")
        fmr_title = request.POST.get("fmr_title") 
        
        title = request.POST.get("title")
        body = request.POST.get("body")
        
        if not sermon_pk.isdigit():
            data = {"message":"Sermon is Invalid", "success":False}
            return JsonResponse(data)
            
        
        if not (title and title.strip() ):
            data = {"message":"Sermon Must Have a Title", "success":False}
            return JsonResponse(data)
        
        if not (body and body.strip() ):
            data = {"message":"Sermon Should Have a Body", "success":False}
            return JsonResponse(data)
        
        
        if not Sermon.objects.filter(id = sermon_pk, title = fmr_title).exists():
            data = {"message":"Sermon is Invalid!", "success":False}
            return JsonResponse(data)
        
        sermon =  Sermon.objects.get(id = sermon_pk, title = fmr_title)
        
        if sermon.title == title and sermon.body == body:
            data = {"message":"No Changes Made!", "success":False}
            return JsonResponse(data)
            
            
        title = title.strip()
        body = body.strip()
        
        sermon.title = title 
        sermon.body = body
        sermon.save()
        
        data = {"message": "Sermon Updated Successfully!", "success": True}
        return JsonResponse(data)
        
    return JsonResponse(data)
    
    
def deleteSermon(request):
    data = {"message":"Unable to Handle This Request!", "success":False}
    if request.method == "POST":
        sermon_pk = request.POST.get("sermon_pk")
        title = request.POST.get("title")
        if not (sermon_pk and sermon_pk.isdigit() ):
            data = {"message": "Invalid Sermon", "success":False}
            return JsonResponse(data)
        
        if not  Sermon.objects.filter(id = sermon_pk, title = title).exists():
            data = {"message": "Sermon Doesn't Exists!", "success":False}
            return JsonResponse(data)
        
        sermon = Sermon.objects.get(id = sermon_pk, title = title)
        sermon.delete()
        data = {"message": "Sermon Deleted Successfully", "success":True}
        return JsonResponse(data)
        
    return JsonResponse(data)