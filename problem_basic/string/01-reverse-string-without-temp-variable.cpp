// Problem 01: Reverse String Without Temp Variable
// Description: Reverse a given string without using a temporary variable.

#include <cstring>
#include <iostream>
#include <string>

using namespace std;

//  with temporary variable
string reverse_string(string str) {
    int j = str.length()-1;

    int i =0;
    while (i <=j){
        char temp=str[i];
        str[i]=str[j];
        str[j]=temp;
        i++;
        j--;
    }
    return str;
}

string reverse(string str){
    int j = str.length()-1;
    int i =0;

    while (i<j) {
        str[i]= str[i]^str[j];
        str[j]=str[i]^str[j];
        str[i]=str[i]^str[j];
        i++;
        j--;
    }

    return str;
}

int main() {
    // TODO: Implement solution.
    string str = "Hello World";
   string newString= reverse_string(str);
   cout << "using extra variable  -> "<< newString << endl;
   cout<<"Without extra var -> "<<reverse(str)<<endl;
    return 0;
}
