#include <iostream>
#include <stack>
#include <string>

using namespace std;

bool isValidParenthesis(string str)
{

    stack<char> st;

    for (char c : str)
    {
        if (c == '{' || c == '[' || c == '(')
        {
            st.push(c);
        }
        else
        {
            if (st.empty())
                return false;

            char last = st.top();
            st.pop();

            if ((last == '{' && c != '}') || (last == '(' && c != ')') || (last == '[' && c != ']'))
            {
                return false;
            }
        }
    }

    if (st.empty())
    {
        return true;
    }

    return false;
}

int main()
{

    string str1 = "()[]{}";
    string str2 = "{]}";
    string str3 = "{}{}";

    cout<< "For str 1: " << isValidParenthesis(str1) << endl;

    cout << "For str 2: " << isValidParenthesis(str2) << endl;
    cout << "For str 3: " << isValidParenthesis(str3) << endl;

    return 0;
}