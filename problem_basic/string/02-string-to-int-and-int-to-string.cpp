// Problem 02: String To Int And Int To String
// Description: Convert string to integer and integer to string.

#include <iostream>
#include <string>
#include <typeinfo>
#include <cxxabi.h>
using namespace std;


template <typename T>
void printType(T var) {
    int status;
    char* realname = abi::__cxa_demangle(
        typeid(var).name(),
        0,
        0,
        &status
    );

    cout << realname << endl;

    free(realname);
}


int stringToInt(const string& str){
    int sign =1;
    int result=0;
    int i=0;

    if(str[i] == '-'){
        sign=-1;
        i=1;
    }

    for(;i<str.length();i++){
        if(str[i]<'0'||str[i]>'9'){
            cout<<"Invalid charcter: "<<str[i]<<endl;
            return 0;
        }
        int digit = str[i]-'0';
        result= result*10+digit;

    }

    return result*sign;
}

string intToString(int input){
    if(input == 0){
        return "0";
    }

    bool isNegative=false;

    if(input<0){
        isNegative=true;
    }

    string result ="";

    while(input>0){
        int num = input%10;
        char ch = num+'0';
        result+=ch;
        input = input/10;
    }
    if (isNegative)
        result += '-';

    reverse(result.begin(), result.end());

    return result;

}

int main() {
    // TODO: Implement solution.
    string str = "-1000";

     printType(str);

    cout<<"Convert string into number: "<<endl;

    int result = stringToInt(str);

    cout<<str<<" "<<result<<endl;
     printType(result);

    cout<<endl;

    int number=432943;

    cout<<"Number to string "<<endl;

    printType(number);

    string stringResult = intToString(number);
    printType(stringResult);

    return 0;
}
