#include<iostream>

using namespace std;

void InsertionSort(int arr[], int n){

    for (int i = 1; i < n; i++)
    {
        int it = arr[i];
        int j = i - 1;

        while(j>=0 && arr[j]>it){
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = it;
    }
}



int main() {
    int arr[] = {34894, 42, 5, 2, 53, 2, 7, 23, 6, 2, 25, 0};
    int n = sizeof(arr) / sizeof(arr[0]);

    cout << "Before sorting:\n";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;

    InsertionSort(arr, n);

    cout << "After sorting:\n";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << endl;

    return 0;
}
