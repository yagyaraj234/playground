// Problem 09: Check Only Digits
// Description: Check if a string contains only digits.

#include <iostream>
#include <string>
using namespace std;


bool isContainDigitOnly(string str){


    for(int i=0;i<str.size();i++){
        char ch= str[i];

        if(ch < '0' ||  ch > '9'){
            return false;
        }

    }
    return true;
}
int main() {
    // TODO: Implement solution.
    //
   cout<<"Contain ont digit for 432423432 : "<< isContainDigitOnly("432423432")<<endl;
   cout<<"Contain ont digit for WEEW1233213 : "<< isContainDigitOnly("WEEW1233213")<<endl;
    return 0;
}
