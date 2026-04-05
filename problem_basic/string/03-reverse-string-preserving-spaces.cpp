// Problem 03: Reverse String Preserving Spaces
// Description: Reverse characters while preserving positions of spaces.

#include <algorithm>
#include <iostream>
#include <string>
#include <utility>

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

void reverseKeepSpacesPosition(string &str){

    int left =0;
    int right =str.length()-1;


    while(left<right){
        if(str[left] ==' '){
            left++;
        }
        else if (str[right]==' ')     {
        right--;
        }
        else{
            swap(str[left],str[right]);
            right--;
            left++;
        }
    }

}


int main() {
    // TODO: Implement solution.
    string str ="AV BSd FDSF";

     // reverse(str.begin(), str.end());
     reverse(str);
     cout<<"result : "<<str<<endl;


     cout<<"Swap without replacing position of spaces"<<endl;

     string strInput="AV FDSFD SSD ADDSA RES";
     cout<<"Input: "<<strInput<<endl;
     reverseKeepSpacesPosition(strInput);
     cout<<"Output: "<<strInput<<endl;

    return 0;
}
