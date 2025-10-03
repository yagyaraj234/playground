#include <iostream>
#include <unordered_map>
using namespace std;

bool containDuplicate(int a[], int n) {
    unordered_map<int, int> up;
    for (int i = 0; i < n; i++) {
        if (up[a[i]]) {
            return true;
        } else {
            up[a[i]]++;
        }
    }
    return false;
}

int main() {
    int arr[] = {1, 3, 534,2,3, 43, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    cout << containDuplicate(arr, n);
    return 0;
}
