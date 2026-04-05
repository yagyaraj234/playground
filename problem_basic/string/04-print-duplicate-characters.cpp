#include <iostream>
#include <string>
using namespace std;

void printDuplicate(string str) {

    int arr[26] = {0};

    // Count frequency
    for (int i = 0; i < str.length(); i++) {
        int index = str[i] - 'A';
        arr[index]++;
    }

    // Print duplicates
    for (int i = 0; i < 26; i++) {
        if (arr[i] > 1) {
            cout << "Duplicate character: "
                 << char('A' + i)
                 << endl;
        }
    }
}

int main() {
    string str = "ABCBDA";
    printDuplicate(str);
    return 0;
}
