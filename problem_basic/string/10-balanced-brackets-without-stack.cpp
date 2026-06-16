// Problem 10: Balanced Brackets Without Stack
// Description: Check balanced brackets in an expression without stack.

#include <iostream>
#include <string>
using namespace std;

bool isBalanced(string str){

    int i=0;
    int j=str.size()-1;

    while(i<j){

        char left =str[i];
        char right =str[j];

        if(left=='{' && right=='}'){
            i++;
            j--;
            continue;
        }else if(left=='[' && right==']'){
            i++;
            j--;
            continue;
        }else if(left=='(' && right==')'){
            i++;
            j--;
            continue;
        }else{
            return false;
        }

    }

    return true;

}
int main() {
    // TODO: Implement solution.
    cout<<"{}[]{ : "<< isBalanced("{}")<<endl;
    cout<<"{}[{}]{} : "<< isBalanced("{}[{}]{}")<<endl;
    return 0;
}
