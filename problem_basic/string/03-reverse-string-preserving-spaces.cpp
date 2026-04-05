// Problem 03: Reverse String Preserving Spaces
// Description: Reverse characters while preserving positions of spaces.

#include <algorithm>
#include <iostream>
#include <string>

using namespace std;

void reverse(string &str){

    int i=0;
    int j= str.length()-1;

    while (i<j) {
        str[i]= str[i]^str[j];
        str[j]= str[i]^str[j];
        str[i]= str[i]^str[j];

        i++;
        j--;
    }
}


int main() {
    // TODO: Implement solution.
    string str ="AV BSd FDSF";

     // reverse(str.begin(), str.end());
     reverse(str);
     cout<<"result : "<<str<<endl;

    return 0;
}
