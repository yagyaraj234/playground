// Problem 08: Balanced Brackets Using Stack
// Description: Check balanced brackets in an expression using stack.

#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isBalanced(string str){

    stack<char> st;

    int len = str.size();

    for(int i=0;i<len;i++){
        char ch = str[i];
        if(str[i]=='{' || str[i] == '[' || str[i] =='('){
            st.push(str[i]);
        }else if(ch =='}' || ch == ']' || ch==')'){
            if(st.empty())
                return false;

            char top=st.top();
            if(top != '{' && ch == '}'){
                return false;
            }else if(top != '(' && ch== ')'){
                return false;
            }else if(top != '[' && ch ==']'){
                return false;
            }else{
                st.pop();
            }

        }
    }

    return st.empty();

}

int main() {
    // TODO: Implement solution.
    //
    //
    //
    cout<<"{}[]{ : "<< isBalanced("{}[]{")<<endl;
    cout<<"{}[{}]{} : "<< isBalanced("{}[{}]{}")<<endl;
    return 0;
}
