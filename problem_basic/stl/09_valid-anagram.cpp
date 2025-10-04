#include<iostream>
#include<algorithm>
#include<string>
using namespace std;



bool isValidAnagram(string str1,string str2){
    int len1 = str1.length();
    int len2 = str2.length();


    if (len1 != len2){
        return false;
    }

    int i = 0;
    bool result =true;
    while (i < len1)
    {
        int index = i + 1;
        if (str1[i] != str2[len1 - index])
        {
            return false;
        }
        i++;
    }

    return result;
}

int main(){

    string str1 = "hellqo";
    string str2 = "olleqh";

    cout << "result: "<< isValidAnagram(str1, str2);

    return 0;
}