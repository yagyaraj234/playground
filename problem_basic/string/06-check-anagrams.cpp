// Problem 06: Check Anagrams
// Description: Check whether two strings are anagrams.

#include <cstring>
#include <iostream>
#include <string>
using namespace std;

bool isAnagram(string str){
    int in=0;
    int len= str.length()-1;

    while (in<len) {

        if(str[in]!=str[len]){
            return false;
        }

        in++;
        len--;

    }

    return true;

}

int main() {
    // TODO: Implement solution.
    cout<<"ABC: "<<isAnagram("ABC")<<endl;
    cout<<"ABA: "<<isAnagram("ABA")<<endl;

    return 0;
}
