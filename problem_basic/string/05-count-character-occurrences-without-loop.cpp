#include <iostream>
#include <string>
using namespace std;

void printDuplicate(string str) {

    int arr[26] = {0};

    // Count frequency
    for (int i = 0; i < str.length(); i++) {
        char ch = str[i];
        if (ch >= 'a' && ch <= 'z') {
                ch = ch - 32;   // correct offset
            }
        int index = ch - 'A';
        arr[index]++;
    }

    // Print duplicates
    for (int i = 0; i < 26; i++) {
        if (arr[i] > 1) {
            cout << "Duplicate character: "
                 << char('A' + i) <<' '<< arr[i]
                 << endl;
        }
    }
}

int main() {
    string str = "AaBCEWREWSFDSAQWFABDA";
    printDuplicate(str);
    return 0;
}
